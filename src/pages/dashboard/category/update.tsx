import type { Category } from 'src/types/category';

import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetCategoryById } from 'src/actions/category';

import CategoryUpdateView from 'src/sections/_dashboard/category/view/category-update-view ';

const metadata = { title: `Update category` };

export default function Page() {
  const { id = '' } = useParams();
  const { category, categoryError, categoryLoading } = useGetCategoryById({ id });
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <CategoryUpdateView
        currentRecord={category as Category}
        empty={categoryError}
        loading={categoryLoading}
      />
    </>
  );
}
