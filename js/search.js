function searchTable(){

    const keyword =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const result = filteredData.filter(item=>{

        return (

            item.toko.toLowerCase().includes(keyword)

            ||

            item.detail.toLowerCase().includes(keyword)

        );

    });

    renderTable(result);

}