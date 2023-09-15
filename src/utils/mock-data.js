export const mockIngredients = [{
    "_id": "643d69a5c3f7b9001cfa093c",
	"name": "Краторная булка N-200i",
	"type": "bun",
	"proteins": 80,
	"fat": 24,
	"carbohydrates": 53,
	"calories": 420,
	"price": 1255,
	"image": "https://code.s3.yandex.net/react/code/bun-02.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
	"__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0941",
	"name": "Биокотлета из марсианской Магнолии",
	"type": "main",
	"proteins": 420,
	"fat": 142,
	"carbohydrates": 242,
	"calories": 4242,
	"price": 424,
	"image": "https://code.s3.yandex.net/react/code/meat-01.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
	"__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa093e",
	"name": "Филе Люминесцентного тетраодонтимформа",
	"type": "main",
	"proteins": 44,
	"fat": 26,
	"carbohydrates": 85,
	"calories": 643,
	"price": 988,
	"image": "https://code.s3.yandex.net/react/code/meat-03.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
	"__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
	"name": "Соус Spicy-X",
	"type": "sauce",
	"proteins": 30,
	"fat": 20,
	"carbohydrates": 40,
	"calories": 30,
	"price": 90,
	"image": "https://code.s3.yandex.net/react/code/sauce-02.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
	"__v": 0
  }
];

export const userMockData = {
	email: 'oktavihos2@gmail.com',
    name: 'Григорьев Евгений',
	password: "123123"
};

export const mockLoginData = {
	email: userMockData.email,
	password: userMockData.password
};

export const mockLoginResponseData = {
	accessToken: "Bearer dsfsdflksdflsdfhkj",
	refreshToken: "ooooosdfsdfsdfsdfsd",
	success: true,
	user: {
		name: userMockData.name,
		email: userMockData.email,
	}
};

export const mockResponseOrderData = {
    "success": true,
    "name": "Space флюоресцентный бургер",
    "order": {
        "ingredients": [mockIngredients[0], mockIngredients[1], mockIngredients[0]],
        "_id": "6502f41f6d2997001caa8a94",
        "owner": {
            "name": "Григорьев Евгений",
            "email": "oktavihos2@gmail.com",
            "createdAt": "2023-07-24T13:22:27.682Z",
            "updatedAt": "2023-07-30T16:32:39.565Z"
        },
        "status": "done",
        "name": "Space флюоресцентный бургер",
        "createdAt": "2023-09-14T11:53:03.551Z",
        "updatedAt": "2023-09-14T11:53:03.736Z",
        "number": 20566,
        "price": 2056
    }
};

export const mockRequestOrderData = {
	"ingredients": [mockIngredients[0]._id, mockIngredients[1]._id, mockIngredients[0]._id],
};

export const responseSocketOrders = {
	orders: [mockResponseOrderData.order],
    total: 1,
    totalToday: 1,
    timestamp: "2023-09-14T11:53:03.736Z"
};
