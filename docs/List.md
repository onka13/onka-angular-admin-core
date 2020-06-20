## Detail Page

```

<onka-list [pageConfig]="pageConfig"></onka-list>

```

### Using Bulk Actions

```
onka-list [pageConfig]="pageConfig" [checkbox]="false">
    <onka-search-left>
        <a mat-raised-button (click)="bulkAction()">Delete Selected Rows</a>
    </onka-search-left>
</onka-list>

...

bulkAction() {
    var ids = this.onkaList.getSelectedRows().map(x => x.id)
    // delete
}

```