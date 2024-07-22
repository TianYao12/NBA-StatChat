interface News {
    url: string;
    urlToImage: string;
    title: string;
}
  
interface NewsPageProps {
    news: News[];
}

interface Team {
    name: string;
    full_name: string;
    conference: string;
}
  
interface TeamPageProps {
teams: Team[];
}

interface PlayerStats {
    id: number;
    PLAYER: string;
    Year: string;
    Season_type: string;
    GP: number;
    MIN: number;
    FG_PCT: number;
    PTS: number;
    AST: number;
    REB: number;
}

interface PlayerData {
    id: number;
    Year: string;
    Season_type: string;
    GP: number;
    MIN: number;
    FG_PCT: number;
    PTS: number;
    AST: number;
    REB: number;
    //   FGM: number;
    //   FGA: number;
    //   FG_PCT: number;
    //   FG3M: number;
    //   FG3A: number;
    //   FG3_PCT: number;
    //   FTM: number;
    //   FTA: number;
    //   FT_PCT: number;
    //   OREB: number;
    //   DREB: number;
    //   STL: number;
    //   BLK: number;
  }