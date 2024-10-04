document.addEventListener('DOMContentLoaded', function()
{
    const myLibrary = [];

    function Book(title, author, pages, read)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        
        this.lido = function() {
            return this.read ? "Já lido" : "Ainda não lido";
        };

        this.info = function() {
            return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.lido();
        };
    }

    function addBookToLibrary(book) {
        myLibrary.push(book);
    }

    function displayBooks()
    {
        console.log("Displaying books");
        const container = document.getElementById('allcards');
        container.innerHTML = '';

        myLibrary.forEach((book, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.pages}</p>
                <p>${book.lido()}</p>
                <button class="mudar" data-index="${index}">Mudar estado de leitura</button>
                <button class="remover" data-index="${index}">Remover livro</button>
            `;
            container.appendChild(card);
        });

        const removeButtons = document.querySelectorAll('.remover');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeBook(index);
            });
        });
        const mudarButtons = document.querySelectorAll('.mudar');
        mudarButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                mudarEstadoLeitura(index);
            });
        });
    }

    function removeBook(index)
    {
        myLibrary.splice(index, 1); // Remove o livro do array
        displayBooks(); // Atualiza a exibição dos livros
    }
    function mudarEstadoLeitura(index) {
        const book = myLibrary[index];
        book.read = !book.read; // Alterna o valor de true para false e vice-versa <<----------------- importante para favoritos
        displayBooks(); // Atualiza a exibição dos livros
    }

    document.getElementById('formulario').addEventListener('submit', function(event)
    {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        // Captura os valores dos inputs
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked; // Checkbox para verificar se foi lido

        const newBook = new Book(title, author, pages, read);

        addBookToLibrary(newBook);
        displayBooks();
        document.getElementById('formulario').reset();
    });

    const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
    addBookToLibrary(theHobbit);

    const autoDaCompadecida = new Book('Auto da Compadecida', 'Autor1', 103, true);
    addBookToLibrary(autoDaCompadecida);

    const gameOfThrones = new Book('Game of Thrones', 'J.R.R. Autor2', 729, true);
    addBookToLibrary(gameOfThrones);

    const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 387, false);
    addBookToLibrary(harryPotter);

    const senhorDosAneis = new Book('Senhor dos Aneis', 'J.R.R. Tolkien', 567, true);
    addBookToLibrary(senhorDosAneis);

    displayBooks();
});