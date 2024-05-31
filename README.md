# NBA StatChat
NBA StatChat is a **Next.js** web application that displays NBA team/player statistics from 2012-2013 to 2021-22 for regular season/playoff games.
There is also a chatbot feature that answers NBA related questions.

## Statistics
- Each player's page contains his statistics in a table and shown in interactive graph made with **Chart.js**
- **Next.js API routes** handle interactions with MongoDB and the public APIs
- Web scraped data from **stats.nba.com** using **Python & BeautifulSoup** and stored in **MongoDB Atlas**
- User authentication is done with **NextAuth, sessions, and MongoDB**
- Some pages are rendered at request time with getServerSideProps

## Chatbot
Users can ask basketball-related questions, and it provides responses based on context retrieved form MongoDB Atlas using MongoDBAtlasSearch
- **MongoDB Atlas:** used to store text embeddings
- **LangChain:** text splitting, integration with OpenAI, and other utilities
- **OpenAI:** GPT-3.5 model for generating responses, OpenAIEmbeddings to turn text chunks to embeddings to store in MongoDB Atlas
- **Vercel:** streaming capabilities 
