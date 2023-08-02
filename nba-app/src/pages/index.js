// pages/index.js
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/news.module.css";

const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/newsget");
      setNews(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h1>NBA News</h1>
      </div>
      <div className={styles.grid}>
        {news.length > 0 ? (
          news.map((article) =>
            article.urlToImage ? (
              <div className={styles.item}>
                <Link href={article.url} className={styles.link}>
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                  />
                  <p>{article.title}</p>
                </Link>
              </div>
            ) : null
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};
export default HomePage;
