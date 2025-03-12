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
        deleteCategoryBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
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

            //  Buttons container
            const btnContainer = document.createElement("div");
            // Edit Button
            const editBtn = document.createElement("button");
            editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
            editBtn.classList.add("edit-site");
            editBtn.onclick = function () {
                editBookmark(category, index);
            };

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;
            deleteBtn.classList.add("delete-site");
            deleteBtn.onclick = function () {
                deleteBookmark(category, index);
            };

            li.appendChild(link);
            li.appendChild(btnContainer);
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);
            ol.appendChild(li);
        });

        // ADD SITE BUTTON
        const addButton = document.createElement("button");
        addButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        addButton.classList.add("add-site");
        addButton.onclick = function () {
            addBookmark(category);
        };

        // SHARE SITE BUTTON
        const shareBtn = document.createElement("button");
        shareBtn.innerHTML = `<i class="fa-solid fa-share"></i>`;
        shareBtn.onclick = function () {
            shareCategory(category);
        };
        categoryTitle.appendChild(shareBtn);

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

// SHARE CATEGORY FUNCTION
// function shareCategory(category) {
//     if (!bookmarks[category]) return alert("Category not found!");

//     const data = JSON.stringify({ [category]: bookmarks[category] });
//     const encodedData = encodeURIComponent(data);
    
//     const whatsappURL = `https://wa.me/?text=${encodedData}`;
//     window.open(whatsappURL, "_blank");
// }

const secretKey = "mySecret123"; // এনক্রিপশন কী (তুমি চাইলে পরিবর্তন করতে পারো)

function shareCategory(category) {
    if (!window.CryptoJS) {
        alert("CryptoJS library not loaded!");
        return;
    }

    if (!bookmarks[category]) return alert("Category not found!");

    const data = JSON.stringify({ [category]: bookmarks[category] });

    // 🔐 ডাটা এনক্রিপ্ট করা হচ্ছে
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    
    const encodedData = encodeURIComponent(encryptedData);
    const whatsappURL = `https://wa.me/?text=${encodedData}`;

    window.open(whatsappURL, "_blank");
}





// IMPORT CATEGORY FUNCTION
// function importCategory() {
//     const jsonData = prompt("Paste the shared JSON data:");

//     if (!jsonData) {
//         alert("No data provided!");
//         return;
//     }

//     try {
//         const importedData = JSON.parse(jsonData);

//         // নতুন ক্যাটাগরি আলাদা ভাবে যোগ করা হবে
//         for (let category in importedData) {
//             if (!bookmarks[category]) {
//                 bookmarks[category] = importedData[category]; // সম্পূর্ণ নতুন ক্যাটাগরি যোগ হবে
//             } else {
//                 alert(`Category "${category}" already exists! It was not merged.`);
//             }
//         }

//         // LocalStorage আপডেট করা
//         localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

//         // UI আপডেট করা
//         renderCategories();

//         alert("New categories imported successfully!");
//     } catch (error) {
//         alert("Invalid data format! Please check the copied text.");
//     }
// }


function importCategory() {
    const encryptedData = prompt("Paste the shared encrypted data:");

    if (!encryptedData) {
        alert("No data provided!");
        return;
    }

    try {
        // 🔓 ডাটা ডিক্রিপ্ট করা হচ্ছে
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            throw new Error("Decryption failed!");
        }

        const importedData = JSON.parse(decryptedData);

        // নতুন ক্যাটাগরি আলাদা ভাবে যোগ করা হবে
        for (let category in importedData) {
            if (!bookmarks[category]) {
                bookmarks[category] = importedData[category]; // সম্পূর্ণ নতুন ক্যাটাগরি যোগ হবে
            } else {
                alert(`Category "${category}" already exists! It was not merged.`);
            }
        }

        // LocalStorage আপডেট করা
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        // UI আপডেট করা
        renderCategories();

        alert("New category imported successfully!");
    } catch (error) {
        alert("Invalid or corrupted data! Please check the encryption key.");
    }
}


// CTRL+U, F12, এবং Inspect Element বন্ধ করতে
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "u" || event.key === "U")) {
        event.preventDefault();
        alert("View Source is disabled!");
    }

    if (event.key === "F12") {
        event.preventDefault();
        alert("Inspect Element is disabled!");
    }
});

// রাইট ক্লিক বন্ধ করা
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("Right-click is disabled!");
});


//  LOAD THE PAGE
renderCategories();
