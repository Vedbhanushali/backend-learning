# Hotels Managment Backend

## GET - API

<https://hotels-pyi8.onrender.com/person>  
filters on person based on work type : ['chef', 'waiter', 'manager']  
<https://hotels-pyi8.onrender.com/person/waiter>  
<https://hotels-pyi8.onrender.com/person/chef>  
<https://hotels-pyi8.onrender.com/person/manager>  

<https://hotels-pyi8.onrender.com/menu>  
filters on menu based on taste : ['sweet', 'spicy', 'sour']  
<https://hotels-pyi8.onrender.com/menu/sweet>  
<https://hotels-pyi8.onrender.com/menu/spicy>  
<https://hotels-pyi8.onrender.com/menu/sour>

## POST - API

### person - creation  

<https://hotels-pyi8.onrender.com/person>  
payload in body JSON format  
**NOTE work type can only be ['chef', 'waiter', 'manager']**

```js
{
  "name": "Alice",
  "age": 28,
  "work": "chef",
  "mobile": "234-234-2345",
  "email": "test@g2.com",
  "address":"CA",
  "salary": 60000
}
```

### MenuItem creattion

<https://hotels-pyi8.onrender.com/menu>  
payload in body JSON format  
**NOTE taste type can only be ['sweet', 'spicy', 'sour']**

```js
{
    "name":"lassi_mod",
    "price": 23000,
    "taste":"sweet",
    "is_drink": true,
    "ingredients": "['milk','butter']",
    "num_sales": 1,
    "cost": 12000
}
```

## Update (PUT) API

### Person

API - <https://hotels-pyi8.onrender.com/person/{person_id}>  
example -
<https://hotels-pyi8.onrender.com/person/65ad00edb6540b9ced1df730>  
and with payload similar as creation

### Menu Item

API - <https://hotels-pyi8.onrender.com/menu/{menu_item_id}>  
and with payload similar as creation

## Delete API

### Delete Person

API - <https://hotels-pyi8.onrender.com/person/{person_id}>  
example -
<https://hotels-pyi8.onrender.com/person/65ad00edb6540b9ced1df730>  

### Delete Menu Item

API - <https://hotels-pyi8.onrender.com/menu/{menu_item_id}>  
