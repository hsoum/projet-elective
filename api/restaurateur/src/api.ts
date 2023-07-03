import data from '@/data';

function mockRequest(data: any): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

const api = {
  news: {
    getLatest(): Promise<any> {
      return mockRequest(data.news);
    },
  },

  restaurants: {
    getAll(): Promise<any> {
      return mockRequest(data.restaurants);
    },
  },

  products: {
    listDiscounted(): Promise<any> {
      return mockRequest(data.saleProducts);
    },

    listNew(): Promise<any> {
      return mockRequest(data.newProducts);
    },
    getArticleById(id: string): Promise<any> {
      const article = data.saleProducts.find((product: any) => product.id === Number(id));
    
      if (article) {
        return mockRequest(article);
      } else {
        return Promise.reject(new Error('Article not found'));
      }
    },
    
  },

  recipes: {
    getFeatured(): Promise<any> {
      return mockRequest(data.recipes);
    },
  },
};

export default api;
