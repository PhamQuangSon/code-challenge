import { type FC, useEffect } from "react";
import CurrencySwapForm from "@/components/currencySwapForm";

// import Message from "@/components/Message";
// import { fetchArticles, fetchSearchResults } from "@/services/articleService";
// import type { TArticle } from "@/store/articleStore";
// import { useArticleStore } from "@/store/articleStore";
// import { useQuery } from "@tanstack/react-query";

const Home: FC = () => {
  // const searchQuery = useArticleStore((state) => state.searchQuery);
  // const setArticles = useArticleStore((state) => state.setArticles);

  // const { data, error, isLoading } = useQuery<{ articles: TArticle[] }>({
  //   queryKey: ["articles"],
  //   queryFn: fetchArticles,
  //   staleTime: 120000, // 2 minutes
  // });

  // const {
  //   data: searchResults,
  //   error: searchError,
  //   isLoading: searchLoading,
  // } = useQuery<{ articles: TArticle[] }>({
  //   queryKey: ["searchResults", searchQuery],
  //   queryFn: () => fetchSearchResults(searchQuery),
  //   enabled: !!searchQuery, // Only run the query if searchQuery is not empty
  // });

  return (
    <>
        <CurrencySwapForm />
    </>
  );
};

export default Home;
