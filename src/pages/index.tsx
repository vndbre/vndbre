import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>vndbre</title>
        <meta name="description" content="vndbre" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-4 items-start">
          <hgroup className="flex flex-col gap-2 items-start">
            <h1 className="text-lg font-bold">Idol Mahou Shoujo Chiruchiru ☆ Michiru</h1>
            <h2 className="">アイドル魔法少女ちるちる☆みちる</h2>
          </hgroup>
          <div className="flex gap-2 items-center">
            <Button>Add to list</Button>
            <Button intent="secondary">Remove</Button>
            <Link className="link" href={'https://github.com/vndbre/vndbre/'}>vndbre repo</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
