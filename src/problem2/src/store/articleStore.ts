import type { ReactNode } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { TComment } from "@/components/Comment";

export type TWithDataFetchingArticle = {
  data?: { articles: TArticle[] };
  isLoading: boolean;
  error: Error | null;
};

export type TArticle = {
  id?: number;
  title: string;
  comments: TComment[];
  clapCount: number;
  content: string;
  author: string; // Removed quotes for author
  email: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  tags: string[];
  image: string;
  actions?: ReactNode;
};

type TArticleState = {
  articles: TArticle[];
  selectedArticle: TArticle;
  isLoading?: boolean;
  searchQuery: string;
  setLoading: () => void;
  setArticleByID: (id: number) => void;
  setSelectArticle: (item: TArticle) => void;
  setArticles: (item: TArticle[]) => void;
  setClap: (newClap: number) => void;
  setComments: (newComments: TComment[]) => void;
  setSearchQuery: (query: string) => void;
  delete: (id: number) => void;
  create: (item: TArticle) => void;
  update: (item: TArticle) => void;
};

export const useArticleStore = create<TArticleState>()(
  devtools(
    persist(
      (set, get) => ({
        articles: [],
        selectedArticle: {} as TArticle,
        isLoading: true,
        searchQuery: "",
        setLoading: () => {
          set((state) => ({
            isLoading: !state.isLoading,
          }));
        },
        setArticles: (item) => {
          set({ isLoading: false, articles: [...item] });
        },
        setArticleByID: (id) => {
          try {
            set(() => ({ isLoading: true }));
            const selected = get().articles.find(
              (article) => article.id === id
            );
            set({
              isLoading: false,
              selectedArticle: selected,
            });
          } catch (err) {
            set(() => ({ isLoading: false }));
          }
        },
        setSelectArticle: (item) => {
          set({ isLoading: false, selectedArticle: item });
        },
        setClap: (newClap) => {
          set((state) => ({
            selectedArticle: {
              ...state.selectedArticle,
              clapCount: newClap,
            },
          }));
        },
        setComments: (newComments) => {
          set((state) => ({
            selectedArticle: {
              ...state.selectedArticle,
              comments: newComments,
            },
          }));
        },
        setSearchQuery: (query: string) => {
          set({ searchQuery: query });
        },
        delete: (id) => {
          try {
            set(() => ({ isLoading: true }));
            const selected = get().articles.filter(
              (article) => article.id !== id
            );
            set({
              isLoading: false,
              articles: selected,
            });
          } catch (err) {
            set(() => ({ isLoading: false }));
          }
        },
        create: (newArticle) => {
          try {
            set((state) => ({ articles: [...state.articles, newArticle] }));
          } catch (err) {
            set(() => ({ isLoading: false }));
          }
        },
        update: (updatedArticle) => {
          try {
            set((state) => ({
              articles: state.articles.map((article) =>
                article.id === updatedArticle.id ? updatedArticle : article
              ),
            }));
          } catch (err) {
            set(() => ({ isLoading: false }));
          }
        },
      }),
      {
        name: "articles",
      }
    )
  )
);
