import React from 'react';

import AnswerRow from '../components/AnswerRow';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex justify-center items-center flex-col h-[90vh] w-[80vw] rounded-lg bg-white mt-12">
            <div className="text-center justify-center items-center h-[15%] w-[100%]">
                <h1 className="text-8xl font-bold italic text-gray-800 h-[100%] w-[100%]">Versle</h1>
            </div>
            {/*Game stuff here */}
            <div className = "text-center justify-center items-center h-[80%] w-[100%] p-8">
                {/* Verse Div Here */}
                 <div className="flex items-center justify-center text-center h-[30%] p-8 bg-gray-300 rounded-xl shadow-sm">
                    <p className="text-2xl text-gray-700 font-bold w-full text-center italic">
                        "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."
                    </p>
                </div>
                {/* Input / Answers Here */}
                <div className="flex flex-col items-center justify-center h-[70%] w-full mt-4 bg-gray-200 rounded-xl shadow-sm p-8">
                    {/* Input Row for Each Answer */}
                    <AnswerRow />
                    <AnswerRow />
                    <AnswerRow />
                    <AnswerRow />
                    <AnswerRow />
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;