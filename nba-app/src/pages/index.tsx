import axios from "axios";
import Link from "next/link";
import styles from "../styles/news.module.css";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";
import Pagination from "@/components/Pagination";

interface News {
  url: string;
  urlToImage: string;
  title: string;
}

interface NewsPageProps {
  news: News[];
}

const HomePage = ({ news }: NewsPageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const { t } = useTranslation();
  const { data: session } = useSession();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // If not, set the language based on some default logic
      const preferredLanguage = navigator.language.split("-")[0];
      if (preferredLanguage === "zh") {
        i18n.changeLanguage("zh");
      } else {
        i18n.changeLanguage("en"); // Default to English
      }
    }
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {session ? (
        <>
          <div className={styles.title}>
            <h1>
              {" "}
              {session.user?.email}'s NBA {t("news")}
            </h1>
          </div>
          <div className={styles.grid}>
            {news.length > 0 ? (
              currentPosts.map((article) =>
                article.urlToImage ? (
                  <div className={styles.item} key={article.title}>
                    <Link href={article.url} className={styles.link}>
                      <img src={article.urlToImage} alt={article.title} />
                      <p style={{ fontSize: "1rem" }}>{article.title}</p>
                    </Link>
                  </div>
                ) : null
              )
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={news.length}
            paginate={paginate}
          />
        </>
      ) : (
        <div>
          <h1>You are not signed in!</h1>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get("http://localhost:3000/api/newsget");
    const news = response.data.articles;

    return {
      props: {
        news,
        session,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        news: [],
        session,
      },
    };
  }
};

export default HomePage;
