import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
          ARC7HIVE
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Plataforma de aprendizado em IA, Marketing Digital e Mercado Financeiro
        </p>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;