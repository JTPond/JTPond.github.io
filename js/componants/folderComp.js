var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ArticleComp } from "./articleComp.js";
export class FolderComp {
    constructor(folder) {
        this.folder = folder;
    }
    getArticleIcon(title, art) {
        let fig = document.createElement('figure');
        fig.classList.add("icon");
        let icon = document.createElement('img');
        icon.src = "./style/assets/article.svg";
        let cap = document.createElement('figcaption');
        cap.textContent = title.replace(/(?<!\\)_/g, ' ').replace(/\_/g, '_');
        fig.append(icon, cap);
        fig.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            let sfc = new ArticleComp(art);
            let pg = document.getElementById('work__page');
            pg.innerHTML = '';
            pg.append(yield sfc.getHTML());
            window.dispatchEvent(new CustomEvent('article_opened', { detail: title }));
        }));
        return fig;
    }
    getFolderIcon(title, fold) {
        let fig = document.createElement('figure');
        fig.classList.add("icon");
        let icon = document.createElement('img');
        icon.src = "./style/assets/folder.svg";
        let cap = document.createElement('figcaption');
        cap.textContent = title.replace(/(?<!\\)_/g, ' ').replace(/\_/g, '_');
        fig.append(icon, cap);
        fig.addEventListener('click', () => {
            let sfc = new FolderComp(fold);
            let pg = document.getElementById('work__page');
            pg.innerHTML = '';
            pg.append(sfc.getHTML());
            window.dispatchEvent(new CustomEvent('folder_opened', { detail: title }));
        });
        return fig;
    }
    getHTML() {
        let out = document.createElement('div');
        out.classList.add("folder");
        console.log(this.folder);
        this.folder.f_order.forEach(key => {
            console.log(key);
            let icon = this.getFolderIcon(key, this.folder.folders.get(key));
            out.append(icon);
        });
        this.folder.a_order.forEach(key => {
            console.log(key);
            out.append(this.getArticleIcon(key, this.folder.articles.get(key)));
        });
        return out;
    }
}
//# sourceMappingURL=folderComp.js.map