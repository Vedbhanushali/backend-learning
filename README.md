# Hotels Managment Backend

## GET - API

<https://hotels-zboe.onrender.com/person>  
filters on person based on work type : ['chef', 'waiter', 'manager']  
<https://hotels-zboe.onrender.com/person/waiter>  
<https://hotels-zboe.onrender.com/person/chef>  
<https://hotels-zboe.onrender.com/person/manager>  

<https://hotels-zboe.onrender.com/menu>  
filters on menu based on taste : ['sweet', 'spicy', 'sour']  
<https://hotels-zboe.onrender.com/menu/sweet>  
<https://hotels-zboe.onrender.com/menu/spicy>  
<https://hotels-zboe.onrender.com/menu/sour>

## POST - API

### person - creation  

<https://hotels-zboe.onrender.com/person>  
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

<https://hotels-zboe.onrender.com/menu>  
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

API - <https://hotels-zboe.onrender.com/person/{person_id}>  
example -
<https://hotels-zboe.onrender.com/person/65ad00edb6540b9ced1df730>  
and with payload similar as creation

### Menu Item

API - <https://hotels-zboe.onrender.com/menu/{menu_item_id}>  
and with payload similar as creation

## Delete API

### Delete Person

API - <https://hotels-zboe.onrender.com/person/{person_id}>  
example -
<https://hotels-zboe.onrender.com/person/65ad00edb6540b9ced1df730>  

### Delete Menu Item

API - <https://hotels-zboe.onrender.com/menu/{menu_item_id}>  
