// LOAD THE DATA FROM LOCAL STORAGE
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

// ADD NEW CATEGORY
function addCategory() {
    const categoryName = document.getElementById("categoryInput").value.trim();
    if (!categoryName) {
        alert("Please enter a category name.");
        return;
    }

    if (!bookmarks[categoryName]) {
        bookmarks[categoryName] = []; // ADD NEW CATEGORY
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderCategories();
    } else {
        alert("Category already exists!");
    }

    document.getElementById("categoryInput").value = "";
}

// SHOW CATEGORY TO THE UI
function renderCategories() {
    const categoriesDiv = document.getElementById("categories");
    // const categoryTitle = document.querySelector('#title');
    categoriesDiv.innerHTML = ""; // CLEAR THE FIRST UI

    for (let category in bookmarks) {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category");
        const categoryTitle = document.createElement("div"); //
        categoryTitle.classList.add("category-title"); //

        const h3 = document.createElement("h3");
        h3.innerText = category; //

        // CATEGORY DELETE BUTTON
        const deleteCategoryBtn = document.createElement("button");
        deleteCategoryBtn.innerText = "🗑️";
        deleteCategoryBtn.classList.add("delete-category");
        deleteCategoryBtn.onclick = function () {
            deleteCategory(category);
        };

        const ol = document.createElement("ol");

        // SHOW BOOKMARKED SITE
        bookmarks[category].forEach((site, index) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = site.url;
            link.innerText = `${index + 1}. ${site.name}`;
            link.target = "_blank";

            // Edit Button
            const editBtn = document.createElement("button");
            editBtn.innerText = "✏️";
            editBtn.classList.add("edit-site");
            editBtn.onclick = function () {
                editBookmark(category, index);
            };

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "❌";
            deleteBtn.classList.add("delete-site");
            deleteBtn.onclick = function () {
                deleteBookmark(category, index);
            };

            li.appendChild(link);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            ol.appendChild(li);
        });

        // ADD SITE BUTTON
        const addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.classList.add("add-site");
        addButton.onclick = function () {
            addBookmark(category);
        };
        
        categoryTitle.appendChild(h3);
        categoryTitle.appendChild(deleteCategoryBtn);
        categoryTitle.appendChild(addButton);
        categoryContainer.appendChild(categoryTitle);
        // categoryContainer.appendChild(deleteCategoryBtn);
        categoryContainer.appendChild(ol);
        // categoryContainer.appendChild(addButton);
        categoriesDiv.appendChild(categoryContainer);
    }
}

// ADD SITE FUNCTION
function addBookmark(category) {
    const siteName = prompt("Enter site name:");
    const siteURL = prompt("Enter site URL:");

    if (!siteName || !siteURL) {
        alert("Site name and URL required!");
        return;
    }

    bookmarks[category].push({ name: siteName, url: siteURL });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderCategories();
}

// SITE EDIT FUNCTION
function editBookmark(category, index) {
    const newName = prompt("Enter new site name:", bookmarks[category][index].name);
    const newURL = prompt("Enter new site URL:", bookmarks[category][index].url);

    if (!newName || !newURL) {
        alert("Both fields are required!");
        return;
    }

    bookmarks[category][index] = { name: newName, url: newURL };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderCategories();
}

// SITE LINK DELETE FUNCTION
function deleteBookmark(category, index) {
    if (confirm("Are you sure you want to delete this site?")) {
        bookmarks[category].splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderCategories();
    }
}

//  CATEGORY DELETE FUCTION
function deleteCategory(category) {
    if (confirm(`Are you sure you want to delete the category "${category}"?`)) {
        delete bookmarks[category];
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderCategories();
    }
}

//  LOAD THE PAGE
renderCategories();
