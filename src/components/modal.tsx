"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  ariaLabel?: string;
  className?: string;
  overlayClassName?: string;
  initialFocusRef?: React.RefObject<Element | null>;
}

const getSizeClass = (size: ModalSize): string => {
  switch (size) {
    case "sm":
      return "max-w-md";
    case "md":
      return "max-w-lg";
    case "lg":
      return "max-w-2xl";
    case "xl":
      return "max-w-4xl";
    case "full":
      return "w-full h-full m-0";
    default:
      return "max-w-lg";
  }
};

export default function Modal(props: ModalProps) {
  const {
    isOpen,
    onClose,
    children,
    title,
    size = "md",
    closeOnOverlayClick = true,
    showCloseButton = true,
    ariaLabel,
    className,
    overlayClassName,
    initialFocusRef,
  } = props;

  const mountedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const target = initialFocusRef?.current;
    if (target instanceof HTMLElement) {
      const id = window.requestAnimationFrame(() => target.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [isOpen, initialFocusRef]);

  const handleOverlayClick = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      if (!closeOnOverlayClick) return;
      if (event.target === event.currentTarget) onClose();
    },
    [closeOnOverlayClick, onClose]
  );

  const overlayClasses = useMemo(
    () =>
      [
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-[2px]",
        overlayClassName,
      ]
        .filter(Boolean)
        .join(" "),
    [overlayClassName]
  );

  const panelClasses = useMemo(
    () =>
      [
        "w-full",
        getSizeClass(size),
        "mx-4",
        "bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100",
        "rounded-lg shadow-xl outline-none relative",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [className, size]
  );

  if (!mountedRef.current || !isOpen) return null;

  const content = (
    <div
      ref={containerRef}
      className={overlayClasses}
      onMouseDown={handleOverlayClick}
      aria-hidden={false}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : ariaLabel}
        className={panelClasses}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-black/5 dark:border-white/10">
            {title ? (
              <div className="text-lg font-semibold leading-6">{title}</div>
            ) : (
              <div />
            )}
            {showCloseButton && (
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );

  return typeof window !== "undefined" && document.body
    ? createPortal(content, document.body)
    : null;
}
