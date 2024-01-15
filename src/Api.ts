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
        linkOrder: number
    }[]
    sectionOrderResponse: {
        sectionId: string,
        sectionName: string,
        index: number,
        column: number
    }[]
}

export class Api {
    static url = 'http://localhost:8080/';
    static authorization = 'Basic dXNlcjI6MTIz';
    
    static GetApiData = class {
        private data!: GetApiType;

        public constructor(data: GetApiType) {
            this.data = data;
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
                    url: '#'
                });
            });

            return links;
        }

        public getSectionOrder() {
            var sectionOrder: string[][] = [[], [], [], []];
            var max = [0, 0, 0, 0];

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
    }

    private userId!: number;

    public constructor(userId: number) {
        this.userId = userId;

        axios.interceptors.request.use((config) => {
            config.headers.Authorization = Api.authorization;
            return config;
        });
    }


    public get(): GetApiType | any {
        axios.get(Api.url + 'api/user' + this.userId + '/get')
        .then(response => {
            console.log(response.data);
            return new Api.GetApiData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
}