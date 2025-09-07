"use client";

import { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "@/components/modal";

export default function Home() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const okButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 맵 배경 이미지 */}
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/main/background.png"
            alt="메인 배경"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 어두운 오버레이 및 비네팅 */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      {/* 히어로 섹션 */}
      <div className="relative z-10 w-full px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl ring-1 ring-white/10 p-8 md:p-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 bg-clip-text text-transparent font-['Noto_Sans_KR']">
            UDH-의성데몬헌터
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 font-['Noto_Sans_KR']">
            의성의 어둠을 사냥하라. 긴장감 넘치는 텍스트 어드벤처.
          </p>
          <div className="mt-6">
            {session ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-100 border border-white/30 shadow-md focus:outline-none focus:ring-4 focus:ring-white/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083h-1.611V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.046 6.053 29.268 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.817C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.62-3.317-11.283-7.946l-6.51 5.02C9.5 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083h-1.611V20H24v8h11.303c-.792 2.239-2.231 4.166-4.084 5.565l.003-.002 6.191 5.238C35.164 40.025 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"
                  />
                </svg>
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-100 border border-white/30 shadow-md focus:outline-none focus:ring-4 focus:ring-white/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083h-1.611V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.046 6.053 29.268 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.817C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.62-3.317-11.283-7.946l-6.51 5.02C9.5 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083h-1.611V20H24v8h11.303c-.792 2.239-2.231 4.166-4.084 5.565l.003-.002 6.191 5.238C35.164 40.025 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"
                  />
                </svg>
                Google로 로그인
              </button>
            )}
          </div>
          <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-lg shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-green-500 hover:shadow-emerald-400/40 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition-transform duration-200 hover:-translate-y-0.5 font-['Noto_Sans_KR']"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              새로운 게임 시작
            </button>
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 text-white/90 hover:bg-white/15 border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/20 transition-transform duration-200 hover:-translate-y-0.5 font-['Noto_Sans_KR']"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M3 4h18v2H3V4zm0 4h10v12H3V8zm12 0h6v12h-6V8z" />
              </svg>
              기존 게임 로드
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="알림"
        size="md"
        initialFocusRef={okButtonRef}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            서비스 준비 중 입니다!
          </p>
          <div className="flex justify-end gap-2">
            <button
              ref={okButtonRef}
              onClick={() => setOpen(false)}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
