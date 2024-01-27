import axios from 'axios';

interface GetApiType {
    userName: string,
    quickLink: {
        linkId: string,
        linkName: string,
        url: string
    }[],
    linkOrderResponse: {
        sectionId: string,
        linkId: string,
        linkName: string,
        url: string,
        linkOrder: number
    }[],
    sectionOrderResponse: {
        sectionId: string,
        sectionName: string,
        index: number,
        column: number
    }[]
}

interface SaveApiType {
    quickLinkDTO: {
        linksId: string[]
    }
    sectionOrderDTOList: {
        userId: number,
        sectionId: string,
        column: number,
        index: number
    }[],
    linkOrderDTOList: {
        userId: number,
        linkId: string,
        sectionId: string,
        linkOrder: number
    }[]
}

export class Api {
    static Url = 'http://localhost:8080/';
    static Authorization = 'Basic dXNlcjI6MTIz';
    
    static GetApiData = class {
        static DefaultData: GetApiType = {
            userName: '-1',
            quickLink: [],
            linkOrderResponse: [],
            sectionOrderResponse: []
        };

        private data!: GetApiType;

        public constructor(data?: GetApiType) {
            if (data != undefined) {
                this.data = data;
            }
            else {
                this.data = Api.GetApiData.DefaultData;
            }
        }

        public getLinks() {
            var links: {
                sectionId: string;
                sectionName: string;
                sectionLinks: {
                    linkId: string;
                    linkName: string;
                    url: string;
                }[];
            }[] = [];
            
            // add section
            this.data.sectionOrderResponse.forEach((section) => {
                links.push({
                    sectionId: section.sectionId,
                    sectionName: section.sectionName,
                    sectionLinks: []
                })
            });
            
            // add links
            this.data.linkOrderResponse.forEach((link) => {
                links.filter((section) => section.sectionId == link.sectionId)[0].sectionLinks.push({
                    linkId: link.linkId,
                    linkName: link.linkName,
                    url: link.url
                });
            });
            
            return links;
        }

        public getSectionOrder() {
            var sectionOrder: string[][] = [[], [], [], []];
            var max = [0, 0, 0, 0];

            if (this.data.sectionOrderResponse.length == 0) {
                return sectionOrder;
            }

            this.data.sectionOrderResponse.forEach((section) => {
                if (section.index > max[section.column]) {
                    max[section.column] = section.index;
                }
            })

            for (var i = 0; i < 4; i++) {
                sectionOrder[i] = Array(max[i] + 1);
            }

            this.data.sectionOrderResponse.forEach((section) => {
                sectionOrder[section.column][section.index] = section.sectionId;
            })

            return sectionOrder;
        }

        public getLinkOrder() {
            var linkOrder: {
                sectionId: string,
                order: string[]
            }[] = [];

            // add sections
            this.data.sectionOrderResponse.forEach((section) => {
                linkOrder.push({
                    sectionId: section.sectionId,
                    order: []
                });
            });

            // add links
            this.data.linkOrderResponse.forEach((link) => {
                var section = linkOrder.filter((section) => section.sectionId == link.sectionId)[0];
                if (link.linkOrder > section.order.length) {
                    section.order = Array(link.linkOrder);
                }
            });
            this.data.linkOrderResponse.forEach((link) => {
                var section = linkOrder.filter((section) => section.sectionId == link.sectionId)[0];
                section.order[link.linkOrder - 1] = link.linkId;
            });

            return linkOrder;
        }

        public getBookmarks() {
            var bookmarks: string[][] = [];

            this.data.quickLink.forEach((bookmark) => {
                bookmarks.push([
                    this.data.linkOrderResponse.filter((link) => link.linkId == bookmark.linkId)[0].sectionId,
                    bookmark.linkId
                ]);
            });

            return bookmarks;
        }
    }

    private userId!: number;

    public constructor(userId: number) {
        this.userId = userId;

        axios.interceptors.request.use((config) => {
            config.headers.Authorization = Api.Authorization;
            return config;
        });
    }


    public async get() {
        var data = new Api.GetApiData();

        try {
            let response = await axios.get(Api.Url + 'api/user' + this.userId + '/get');
            console.log(response.data);
            data = new Api.GetApiData(response.data);
        }
        catch (error) {
            console.log(error);
        }

        return data;
    }

    public async getDefault() {
        var data = new Api.GetApiData();

        try {
            let response = await axios.get(Api.Url + 'api/user6/get');
            console.log(response.data);
            data = new Api.GetApiData(response.data);
        }
        catch (error) {
            console.log(error);
        }

        return data;
    }

    public async save(saveData: SaveApiType) {
        try {
            let response = await axios.post(Api.Url + 'api/user' + this.userId + '/save', saveData);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    public async unbookmark(bookmarksRemoved: string[][]) {
        // conversion
        var data = {
            linksId: Array(bookmarksRemoved.length)
        }
        for (var i = 0; i < data.linksId.length; i++) {
            data.linksId[i] = bookmarksRemoved[i][1];
        }

        try {
            let response = await axios.post(Api.Url + 'api/user' + this.userId + '/unbookmark', data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    public async reset() {
        try {
            let response = await axios.post(Api.Url + 'api/user' + this.userId + '/reset');
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }


    public async frequent() {
        var data: {
            topLinks: {
                linkId: string,
                linkName: string,
                url: string
            } []
        } = {
            topLinks: []
        };

        try {
            let response = await axios.get(Api.Url + 'api/top-links');
            data = response.data;
        }
        catch (error) {
            console.log(error);
        }

        return data;
    }

    public convertSaveData(
        sectionOrder: string[][],
        linkOrder: {
            sectionId: string;
            order: string[];
        }[],
        bookmarksAdded: string[][]

    ): SaveApiType {
        var saveData: SaveApiType = {
            quickLinkDTO: {
                linksId: []
            },
            sectionOrderDTOList: [],
            linkOrderDTOList: []
        }

        // bookmark
        bookmarksAdded.forEach((bookmark) => {
            saveData.quickLinkDTO.linksId.push(bookmark[1]);
        });

        // section order
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < sectionOrder[i].length; j++) {
                saveData.sectionOrderDTOList.push({
                    userId: this.userId,
                    sectionId: sectionOrder[i][j],
                    column: i,
                    index: j
                });
            }
        }

        // link order
        linkOrder.forEach((section) => {
            var sectionId = section.sectionId;
            for (var i = 0; i < section.order.length; i++) {
                saveData.linkOrderDTOList.push({
                    userId: this.userId,
                    linkId: section.order[i],
                    sectionId: sectionId,
                    linkOrder: i + 1
                });
            }
        });


        return saveData
    }
}