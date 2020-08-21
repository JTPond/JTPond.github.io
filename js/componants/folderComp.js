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
        fig.addEventListener('click', () => {
            // let sfc = new ArticleComp(art);
            // let pg = document.getElementById('work__page');
            // pg.innerHTML = '';
            // pg.append(await sfc.getHTML());
            // window.dispatchEvent(new CustomEvent('article_opened',{detail:title}));
            window.location.hash = window.location.hash + title;
        });
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
            // let sfc = new FolderComp(fold);
            // let pg = document.getElementById('work__page');
            // pg.innerHTML = '';
            // pg.append(sfc.getHTML());
            // window.dispatchEvent(new CustomEvent('folder_opened',{detail:title}));
            window.location.hash = window.location.hash + title + '/';
        });
        return fig;
    }
    getHTML() {
        let out = document.createElement('div');
        out.classList.add("folder");
        this.folder.f_order.forEach(key => {
            let icon = this.getFolderIcon(key, this.folder.folders.get(key));
            out.append(icon);
        });
        this.folder.a_order.forEach(key => {
            out.append(this.getArticleIcon(key, this.folder.articles.get(key)));
        });
        return out;
    }
}
//# sourceMappingURL=folderComp.js.map