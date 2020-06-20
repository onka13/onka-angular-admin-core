## Dialog Component

Display a dialog


```
this.uiManager.openDialog(
{        
    disableClose: true, // Disable close
    data: {
        url: 'AdminApi/AdminUserSearch',
        hideFilters: true,
        addSelectField: true,
        defaultValues: { name: 'user' }, // filter data  
        hideActions: true, // Hide create, edit, delete buttons
        hideDefaultFilters: true,  // Hide name input in filters area
        title: 'Admin Users',
        toolbar: true,
        redirect: 'detail' // redirection after upsert
    },
    },
    (record) => {
        // on selected event after closing dialog
        console.log('selected record', record);
    },
    {        
        //width: '50vw',
        //height: '70vh',
        //fullScreen: false,
    },
);
```

### Display a confirm dialog

```
this.uiManager.confirm({
    content: 'This item will be deleted! Are you sure?'
}, (res) => {
    if (!res) return;
    // delete item
});

// or

this.openDialog(
{
    data: {
        title: 'Warning!',
        content: 'Are you sure?',
        actions: [
            { label: 'No', value: false },
            { label: 'Yes', value: true, color: 'primary' },
        ],
    },
},
(result) => {
    // result true if user clicked yes.
},
{
    small: true,
});
```