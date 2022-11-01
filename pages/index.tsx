import Head from "next/head";

type HomeProps = {
  count: number;
};

export default function Home({ count }: HomeProps) {
  return (
    <>
      <Head>
        <title>NLW Copa</title>
        <meta name="description" content="NLW Copa" />
      </Head>

      <main>
        <h1>Contagem: {count}</h1>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();

  return {
    props: {
      count: data.count,
    },
  };
};
