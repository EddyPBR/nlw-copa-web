import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NextImage from "next/image";

import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { getPoolCount } from "../api/getPoolCount";
import { getGuessCount } from "../api/getGuessCount";
import { getUserCount } from "../api/getUserCount";
import { FormEvent, useState } from "react";
import { createPool } from "../api/createPool";

type HomePageProps = {
  poolCount: number;
  guessCount: number;
  userCount: number;
};

const HomePage: NextPage<HomePageProps> = ({ poolCount, guessCount }) => {
  const [poolTitle, setPoolTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const createPoolResponse = await createPool({ title: poolTitle });

      const code = createPoolResponse.data.code;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso, o código foi copiado para a área de transferência"
      );

      setPoolTitle("");
    } catch (error: any) {
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>NLW COPA</title>
        <meta name="description" content="NLW Copa" />
      </Head>

      <div className="w-[90vw] max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
        <main>
          <NextImage src={logoImg} alt="NLW Copa" />

          <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <NextImage src={usersAvatarExampleImg} alt="" />

            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">+12.592</span> pessoas já estão
              usando
            </strong>
          </div>

          <form onSubmit={onSubmit} className="mt-10 flex gap-2">
            <input
              className="flex-1 px-6 py-4 rounded bg-gray-800 text-gray-100 border border-gray-600 text-sm"
              type="text"
              required
              placeholder="Qual nome do seu bolão?"
              value={poolTitle}
              onChange={(event) => setPoolTitle(event.target.value)}
            />
            <button
              className="bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:brightness-90 transition-all"
              type="submit"
              disabled={isLoading}
            >
              Criar meu bolão
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <NextImage src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px max-h-max bg-gray-600" />

            <div className="flex items-center gap-6">
              <NextImage src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <NextImage src={appPreviewImg} alt="NLW Copa" />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([getPoolCount(), getGuessCount(), getUserCount()]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    revalidate: 600, // 10 minutes
  };
};

export default HomePage;
