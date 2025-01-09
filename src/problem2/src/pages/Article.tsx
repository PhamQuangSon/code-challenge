import { type FC } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import RichTextForm from "@/components/RichTextForm";
import type { TArticle } from "@/store/articleStore";
import { useArticleStore } from "@/store/articleStore";
import { CREATE_ARTICLE, UPDATE_ARTICLE } from "@/store/statics";
import axiosInstance from "@/utils/axiosInstance";

const Article: FC = () => {
  const selectedArticle = useArticleStore((state) => state.selectedArticle);
  // const setArticleByID = useArticleStore((state) => state.setArticleByID);
  const createArticle = useArticleStore((state) => state.create);
  const updateArticle = useArticleStore((state) => state.update);

  const [searchParams] = useSearchParams();
  const isNew = searchParams.has("new");
  console.log("isNew", isNew);
  const currentId = parseInt(searchParams.get("id") || "1");
  const nav = useNavigate();

  // useEffect(() => {
  //   if (selectedArticle.id != currentId) {
  //     // setArticleByID(Number(currentId));
  //   }
  // }, [currentId, selectedArticle, setArticleByID]);

  const onSubmit = async (
    data: Omit<
      TArticle,
      "comments" | "clapCount" | "author" | "email" | "createdAt" | "updatedAt"
    >
  ) => {
    const params: TArticle = {
      ...(selectedArticle || {}),
      ...data,
    };

    try {
      if (isNew) {
        const response = await axiosInstance.post(CREATE_ARTICLE, params);
        if (response.status === 200) {
          createArticle(response.data.articles);
          toast.success("Article created successfully");
        } else {
          throw new Error("Failed to create article");
        }
      } else {
        const response = await axiosInstance.post(UPDATE_ARTICLE, {
          ...params,
          id: Number(currentId),
        });
        if (response.status === 200) {
          updateArticle(response.data.articles);
          toast.success("Article updated successfully");
        } else {
          throw new Error("Failed to update article");
        }
      }
      setTimeout(() => {
        nav("/articles");
      }, 2000);
    } catch (error) {
      console.error("Article operation failed:", error);
      toast.error("Failed to save article. Please try again.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center m-4 px-6 py-8 mx-auto min-h-full lg:py-0 animate animate-fade-right animate-duration-1000 animate-delay-300">
      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex md:flex-row items-center justify-between gap-4 relative w-full">
            <div className="w-full md:w-3/4">
              <h4 className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
                <span>{isNew ? "Add Article" : "Edit Article"}</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-sky-400 dark:bg-white opacity-25"></span>
              </h4>
            </div>
            <div>
              <button
                className="p-2 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
                onClick={() => nav(-1)}
              >
                <ArrowRight
                  size={16}
                  strokeWidth={1.25}
                  className="dark:text-white"
                />
              </button>
            </div>
          </div>
          <RichTextForm
            initialData={
              !isNew && selectedArticle
                ? {
                    title: selectedArticle.title,
                    content: selectedArticle.content,
                    description: selectedArticle.description,
                    tags: selectedArticle.tags,
                    image: selectedArticle.image,
                  }
                : {
                    title: "",
                    content: "",
                    description: "",
                    tags: [],
                    image: "",
                  }
            }
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Article;
