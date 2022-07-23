import { Hashgit Router as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { ComicsPage, MainPage, Page404, SingleComicPage } from "../pages";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

// сделать ссылки на комиксы в скелетоне кликабельными
// отфильтровать всех комиксов и персонажей по описанию,картинке и популярности
// сделать адаптив
