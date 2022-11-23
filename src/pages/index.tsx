import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>vndbre</title>
        <meta name="description" content="vndbre" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Idol Mahou Shoujo Chiruchiru ☆ Michiru</h1>
          <h2 className="">アイドル魔法少女ちるちる☆みちる</h2>
        </div>
      </main>
    </>
  );
};

export default Home;
