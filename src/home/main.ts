import "../theme.css";
import { hydrate } from "svelte";
import MyApp from "./MyApp.svelte";

hydrate(MyApp, { target: document.body });