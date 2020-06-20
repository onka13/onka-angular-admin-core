## Detail Page

```
<onka-detail [pageConfig]="pageConfig" [displayColumns]="displayColumns"></onka-detail>

....

constructor(onkaService: OnkaService)
{
    // You can add or remove columns 
    this.displayColumns = onkaService.getDetailColumns(pageConfig);
}

```

### Using Tabs

```
<onka-detail [pageConfig]="pageConfig">
    <onka-tab-group>
        <onka-tab label="tab1" [pageFields]="tab1Fields"></onka-tab>
        <onka-tab label="tab2" [pageFields]="tab2Fields"></onka-tab>
    </onka-tab-group>
</onka-detail>

```

