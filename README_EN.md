## Part of the control package and use

### MTree
#### Demonstration
![](https://calebman.github.io/vue-DBM/tree.gif)

#### Docs
* props

name | description | type
------------ | ------------- | -------------
value | source data，can use v-model | Array

* events

name | description | params
------------ | ------------- | -------------
SaveEdit | Save the edited node  | (parentNode、node、next)
DelNode | Delete Node | (parentNode、node、next)
NodeClick | Node click event | (node)

* source data description

name | description 
------------ | -------------
value | Identifies
label | Show name
status | (1:Edited)(0:Show)(-1:Not editable)
children | Children node

* Example

```
 <m-tree
    v-model="tableTree"
    @SaveEdit="SaveEdit"
    @DelNode="DelNode"
    @NodeClick="handleNodeClick"></m-tree>

SaveEdit(parentNode,data,next){
    var param = {
      parentNode:parentNode,
      node:data
    }
    this.$http.post(URL,param).then((response) => {
      if(response.status == 200){
        next(true,response.body.data.nodeId)
      }else{
        next(false)
      }
    })
}
```


## Project run

### clone
```
git clone https://github.com/calebman/vue-DBM.git
```

### install
```
npm install
```

### run localhost:8000
```
npm run dev
```

### build
```
npm run build
```

### login
Login account and password are free to enter

### demo

[click me](https://calebman.github.io/vue-DBM/index.html)

### Back

[click me](https://github.com/calebman/nodejs-DBM)

## Screenshot

#### login

![](https://calebman.github.io/vue-DBM/login.png)

#### permission

![](https://calebman.github.io/vue-DBM/permission.png)

#### tables

![](https://calebman.github.io/vue-DBM/table.png)

#### create tables

![](https://calebman.github.io/vue-DBM/createTable.png)

#### data

![](https://calebman.github.io/vue-DBM/tableData.png)