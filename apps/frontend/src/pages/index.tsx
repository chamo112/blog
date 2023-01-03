import { useQuery } from '@apollo/client';

import Card from '@/components/ArticleCard/index';
import { graphql } from '@/gql';

const queryDocument = graphql(`
  query MyQuery {
    articles {
      id
      title
      body
      updatedBy {
        name
        picture
      }
    }
  }
`);

const Index = () => {
  const { loading, error, data } = useQuery(queryDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className='px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28'>
      <div className='mb-10 md:mb-16'>
        {/* ブログのタイトル */}
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
          Articles
        </h2>
      </div>

      {/* コンテンツ */}
      <div className='mx-auto mt-12 grid max-w-lg gap-10 md:mx-20 lg:max-w-none lg:grid-cols-3'>
        {data!.articles.map((article) => (
          <Card
            key={article.id}
            id={article.id}
            title={article.title}
            body={article.body}
            categoryName='Article'
            href='#'
            imageUrl='https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
            author={{
              name: `${article.updatedBy!.name}`,
              imageUrl: `${article.updatedBy!.picture}`,
            }}
            date='Mar 16, 2020'
          />
        ))}
      </div>
    </div>
  );
};
export default Index;