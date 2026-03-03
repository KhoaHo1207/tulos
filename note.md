# Backend Migration Plan (MongoDB + Node)

## 1. Collections / Tables

1. **products**
   - `_id`, `slug` (indexed, unique), `name`, `intro`, `description`, `variant` (`"tshirt"|"jacket"|...`), `status` (`"hot"|"new"|"sale"`), `stock`, `price`, `discount`, `isActive`, timestamps.
   - `imageUrls: string[]` to replace Sanity image helpers.
   - `categoryIds: ObjectId[]` linking to `categories`.

2. **categories**
   - `_id`, `title`, `slug`, `description`, `imageUrl`, timestamps.
   - Used by `CategoryProducts` tabs and `/category/:slug` view.

3. **sales**
   - `title`, `description`, `badge`, `discountAmount`, `couponCode`, `validFrom`, `validUntil`, `isActive`, `imageUrl`.
   - Supports `DiscountBanner` and deals messaging.

4. **customers** (optional caching of Clerk data)
   - `clerkUserId`, `email`, `fullName`, `stripeCustomerId`, `phone`, default address.
   - Helps identify ownership of orders and re-use Stripe customer.

5. **orders**
   - `orderNumber`, `clerkUserId`, `customerName`, `email`, `currency`, `totalPrice`, `amountDiscount`, `status` (`pending|paid|shipped|delivered|cancelled`), `orderDate`.
   - Stripe fields: `stripeCheckoutSessionId`, `stripePaymentIntentId`, `stripeCustomerId`, `invoice` object (`id`, `number`, `hostedInvoiceUrl`).
   - `items: [{ productId, productSnapshot: { name, price, imageUrl }, quantity, unitPrice, discountAtOrder }]`.
   - Indexes on `clerkUserId`, `orderNumber`, `status`.
   - `meta` for coupon/metadata if needed.

6. **stripe_sessions** (helpful for debugging)
   - `sessionId`, `metadata`, `status`, `checkoutUrl`, `expiresAt`, `payload`.

## 2. Relationships

- `products.categoryIds` → `categories._id` (many-to-many).
- `orders.items.productId` references `products._id` and stores snapshot for historical price.
- `orders.clerkUserId` links to Clerk user; `customers.clerkUserId` can maintain user profile.

## 3. REST API Endpoints to Replace Sanity Fetches

### Product / Category APIs

1. `GET /api/products?variant=...`
   - Returns list (fields: `name`, `slug`, `price`, `discount`, `status`, `stock`, `imageUrls`, `categoryIds`).
   - Used by `ProductGrid` to display tabs.

2. `GET /api/products/:slug`
   - Returns a single product for `/product/[slug]`.

3. `GET /api/categories`
   - Lists all categories for sidebar tabs.

4. `GET /api/categories/:slug/products`
   - Returns products for the selected category slug used by `CategoryProducts`.

5. `GET /api/products/all` or `GET /api/deals`
   - Provides the full catalog for `DealsSection`.

6. `GET /api/sales`
   - Supplies sale/banner info for `DiscountBanner`.

### Checkout / Order APIs

1. `POST /api/checkout-session`
   - Body: `{ items: [{ productId, quantity }], metadata: { orderNumber, customerName, customerEmail, clerkUserId } }`.
   - Creates Stripe checkout session and returns `session.url`.
   - Replaces `createCheckoutSession`.

2. `POST /api/webhook`
   - Validates Stripe signature, reads session & invoice.
   - Builds `orders` document with metadata and `items` snapshot.
   - Stores Stripe IDs, invoice data, sets `status` (e.g., `paid`).

3. `GET /api/orders?userId=...`
   - Returns that user’s orders, including items, status, invoice, totals.
   - Used by `/orders` and `/success` pages.

4. `DELETE /api/orders/:orderId`
   - Removes order if it belongs to requesting Clerk user.
   - Mirrors `/api/delete-order`.

### Security & Auth Notes

- Protect `/api/checkout-session`, `/api/orders`, `/api/delete-order` with Clerk authentication (validate Clerk token or session).
- Embed `clerkUserId` in metadata (already used today) so API can link orders to Clerk.
- Ensure `GET /api/orders` filters by Clerk user; never return other users’ orders.

## 4. Further Tasks

- Implement Mongo indexes (`products.slug`, `categories.slug`, `orders.clerkUserId`, `orders.orderNumber`).
- Maintain image hosting — serve URLs stored in `imageUrls`.
- Mirror discount/states to keep UI logic (status badges, stock checks) intact.
- Log Stripe sessions (`stripe_sessions`) if you need retries/replay.
