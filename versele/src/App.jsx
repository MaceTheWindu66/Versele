import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FeedbackCell from "./components/FeedbackCell";

// Canonical list of Protestant Bible books (66)
const BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther",
  "Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel",
  "Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians",
  "Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter",
  "2 Peter","1 John","2 John","3 John","Jude","Revelation"
];

// KJV Verses
const VERSES = [
  { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heavens and the earth." },
  { book: "Exodus", chapter: 20, verse: 13, text: "Thou shalt not kill." },
  { book: "Psalms", chapter: 23, verse: 1, text: "The LORD is my shepherd; I shall not want." },
  { book: "Proverbs", chapter: 3, verse: 5, text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding." },
  { book: "Isaiah", chapter: 40, verse: 31, text: "But they that wait upon the LORD shall renew their strength..." },
  { book: "John", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only begotten Son..." },
  { book: "Romans", chapter: 8, verse: 28, text: "And we know that all things work together for good to them that love God..." },
  { book: "Philippians", chapter: 4, verse: 13, text: "I can do all things through Christ which strengtheneth me." },
  { book: "Hebrews", chapter: 11, verse: 1, text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
  { book: "Revelation", chapter: 3, verse: 20, text: "Behold, I stand at the door, and knock..." },
];

const MAX_GUESSES = 6;

function pickRandomVerse() {
  const randomIndex = Math.floor(Math.random() * VERSES.length);
  return VERSES[randomIndex];
}

function getBookIndex(book) {
  return BOOKS.indexOf(book);
}

export default function App() {
  const [target, setTarget] = useState(pickRandomVerse());
  const [guesses, setGuesses] = useState([]);
  const [book, setBook] = useState(BOOKS[0]);
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const targetBookIdx = useMemo(() => getBookIndex(target.book), [target.book]);

  {/*Function for evaluationg a guess */}
  function evaluateGuess({ book, chapter, verse }) {
    const fb = { book: "wrong", chapter: "wrong", verse: "wrong" };

    const idx = getBookIndex(book);
    {/*Check book*/}
    if (idx == targetBookIdx) {
      fb.book = "correct";
    } else if (idx < targetBookIdx) {
      fb.book = "higher";
    } else { 
      fb.book = "lower";
    }

    {/*Check chapter*/}
    if (chapter === target.chapter) {
      fb.chapter = "correct";
    } else if (chapter < target.chapter) {
      fb.chapter = "higher";
    } else {
      fb.chapter = "lower";
    }

    {/*Check verse*/}
    if (verse === target.verse) {
      fb.verse = "correct";
    } else if (verse < target.verse) {
      fb.verse = "higher";
    } else {
      fb.verse = "lower";
    }


    return fb;
  }

  function handleGuess() {
    if(done) return;
    const guess = {book, chapter: Number(chapter), verse: Number(verse)};
    const feedback = evaluateGuess(guess);
    const next = [...guesses, { guess, feedback }];
    setGuesses(next);

    const isWin = feedback.book === "correct" && feedback.chapter === "correct" && feedback.verse === "correct";
    if (isWin) {
      setDone(true);
      setMessage("You got it! Congratulations!");
    } else if(next.length >= MAX_GUESSES) {
      setDone(true);
      setMessage(`Game over! The correct verse was ${target.book} ${target.chapter}:${target.verse}.`);
    } else{
      setMessage(`${MAX_GUESSES - next.length} guesses left...`);
    }

  }

  function newRound(){
    setTarget(pickRandomVerse());
    setGuesses([]);
    setBook(BOOKS[0]);
    setChapter(1);
    setVerse(1);
    setDone(false);
    setMessage("");
  }




   return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Versele</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm" onClick={newRound}>New Round</button>
          </div>
        </div>

        {/* Verse Card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4">
          <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{target.text}</div>
          {done && (
            <div className="mt-3 text-sm text-zinc-400">
              Reference: <span className="text-zinc-200 font-semibold">{target.book} {target.chapter}:{target.verse}</span>
            </div>
          )}
        </motion.div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-zinc-400">Book</label>
            <select
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm"
              value={book}
              onChange={(e) => setBook(e.target.value)}
            >
              {BOOKS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400">Chapter</label>
            <input
              type="number"
              min={1}
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm"
              value={chapter}
              onChange={(e) => setChapter(e.target.valueAsNumber || 1)}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Verse</label>
            <input
              type="number"
              min={1}
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm"
              value={verse}
              onChange={(e) => setVerse(e.target.valueAsNumber || 1)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleGuess} disabled={done} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50">Guess</button>
          <AnimatePresence>
            {message && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="text-sm text-zinc-300 px-2 py-1">
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guess history */}
        <div className="space-y-2">
          {guesses.map((g, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 w-8">{i + 1}/{MAX_GUESSES}</span>
              <div className="grid grid-cols-3 gap-2 flex-1">
                <FeedbackCell status={g.feedback.book}>
                  {g.book}
                  {g.feedback.book === "earlier" && <span className="ml-1">(earlier)</span>}
                  {g.feedback.book === "later" && <span className="ml-1">(later)</span>}
                </FeedbackCell>
                <FeedbackCell status={g.feedback.chapter}>
                  Ch. {g.chapter}
                  {g.feedback.chapter === "higher" && <span className="ml-1">↑</span>}
                  {g.feedback.chapter === "lower" && <span className="ml-1">↓</span>}
                </FeedbackCell>
                <FeedbackCell status={g.feedback.verse}>
                  V. {g.verse}
                  {g.feedback.verse === "higher" && <span className="ml-1">↑</span>}
                  {g.feedback.verse === "lower" && <span className="ml-1">↓</span>}
                </FeedbackCell>
              </div>
            </div>
          ))}
        </div>

        {/* Help */}
        <details className="mt-2 text-sm text-zinc-300">
          <summary className="cursor-pointer text-zinc-200">How to play</summary>
          <div className="mt-2 space-y-1">
            <p>A verse is shown above. Guess its reference by choosing the Book and entering Chapter and Verse. You have {MAX_GUESSES} tries.</p>
            <p>Book feedback: <span className="text-green-400">green</span> = correct; <span className="text-yellow-400">yellow</span> = the right book is earlier/later in the Bible.</p>
            <p>Chapter/Verse feedback: <span className="text-green-400">green</span> = correct; <span className="text-yellow-400">yellow</span> = guess higher/lower.</p>
            <p>Click <kbd className="px-1 bg-zinc-800 rounded">New Round</kbd> for another verse.</p>
          </div>
        </details>
      </div>
    </div>
  );
}