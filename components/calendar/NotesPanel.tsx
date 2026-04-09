"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Note, DateRange } from "@/types/calendar";
import { formatDateDisplay, toDateKey, isSameDate } from "@/lib/utils";

interface Props {
  notes: Note[];
  range: DateRange;
  onAdd: (content: string, rangeStart?: string, rangeEnd?: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  month: number;
  year: number;
}

export function NotesPanel({ notes, range, onAdd, onDelete, onUpdate, month, year }: Props) {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const hasRange = range.start && range.end;
  const rangeLabel = hasRange
    ? `${formatDateDisplay(range.start!)} → ${formatDateDisplay(range.end!)}`
    : range.start
    ? `${formatDateDisplay(range.start)} (select end date)`
    : null;

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(
      trimmed,
      range.start ? toDateKey(range.start) : undefined,
      range.end ? toDateKey(range.end) : undefined,
    );
    setInput("");
  };

  const handleEdit = (note: Note) => {
    setEditId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editId && editContent.trim()) {
      onUpdate(editId, editContent.trim());
    }
    setEditId(null);
    setEditContent("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/60">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span>📝</span> Notes
          {notes.length > 0 && (
            <span className="ml-auto text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">
              {notes.length}
            </span>
          )}
        </h3>
        {rangeLabel && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-indigo-500 dark:text-indigo-400 mt-1 truncate"
          >
            📅 {rangeLabel}
          </motion.p>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/60">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd(); }}
          placeholder={hasRange ? "Add note for selected range..." : "Add a monthly note..."}
          rows={3}
          className="w-full text-sm resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="mt-2 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
        >
          Add Note
        </button>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-center">⌘+Enter to save</p>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <AnimatePresence initial={false}>
          {notes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-slate-400 dark:text-slate-500"
            >
              <div className="text-3xl mb-2">🗒️</div>
              <p className="text-xs">No notes yet. Add one above.</p>
            </motion.div>
          )}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/30 p-3"
            >
              {note.rangeStart && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mb-1 font-medium">
                  📅 {note.rangeStart}{note.rangeEnd && note.rangeEnd !== note.rangeStart ? ` → ${note.rangeEnd}` : ""}
                </p>
              )}
              {editId === note.id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    autoFocus
                    className="w-full text-sm resize-none rounded-lg border border-amber-300 dark:border-amber-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <div className="flex gap-2 mt-1">
                    <button onClick={handleSaveEdit} className="text-xs text-green-600 dark:text-green-400 font-medium hover:underline">Save</button>
                    <button onClick={() => setEditId(null)} className="text-xs text-slate-400 hover:underline">Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">{note.content}</p>
              )}
              {/* Actions */}
              {editId !== note.id && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(note)}
                    className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-500 transition-colors"
                    aria-label="Edit note"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                    aria-label="Delete note"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 3h8M5 3V2h2v1M4 3v6h4V3H4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
