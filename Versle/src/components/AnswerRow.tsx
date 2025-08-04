import React from "react";
import BookBox from "./BookBox";
import ChapterBox from "./ChapterBox";
import VerseBox from "./VerseBox";

const AnswerRow = () => {
    return (
        <div className="flex flex-row items-center justify-center w-full mb-4 space-x-4">
                        <BookBox />
                        <ChapterBox />
                        <VerseBox />
                    </div>
    );
}
export default AnswerRow