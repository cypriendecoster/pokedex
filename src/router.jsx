import { BrowserRouter, HashRouter } from "react-router-dom";

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

export default Router;
