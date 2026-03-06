import Container from "@/components/Container";
import CategoryProducts from "@/components/CategoryProducts";
import Title from "@/components/Title";
import { getAllCategories } from "@/sanity/helpers/queries";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const categories = await getAllCategories();

  return (
    <div>
      <Container className="py-10">
        <Title className="text-xl">
          Products by Category:{" "}
          <span className="font-bold tracking-wide text-green-600 capitalize">
            {slug && slug}
          </span>
        </Title>

        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
