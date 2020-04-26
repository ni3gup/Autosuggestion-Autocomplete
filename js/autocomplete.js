let currentFocus;

let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null;

$('#name').on('input', function() {
    const val = $(this).val();
    
    $('.items').remove();

    if (!val) return false; 
    currentFocus = -1;

    const createEl = '<div class="items"></div>';

    $(this).parent().append(createEl);

    const itemEl = $(this).parent().find('.items');

    users.forEach(function(user) {
        if (user.name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            const userEl = `<div class="name">
                                <strong>${user.name.substr(0, val.length)}</strong>${user.name.substr(val.length)}
                                <input type='hidden' value="${user.name}" data-id="${user.id}" data-email="${user.email}">
                            </div>`;

            itemEl.append(userEl);
        }
    });
});

$('body').on('click', '.name', function() {
    const name = $(this).find('input').val();
    const email = $(this).find('input').attr('data-email');

    $('#name').val(name);
    $('#email').val(email);

    $('#name').prop('readonly', true);

    $('.clear').show();
    
    closeAllLists(this);
});

$('#name').keydown(function(e) {
    let x = $('.items');
    if(x) {
        x = $(x).children();
    }

    if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
    } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
    } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (x) {
                $(x[currentFocus]).trigger('click');
            } 
        }
    }
});

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    
    $(x[currentFocus]).addClass("active");
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        $(x[i]).removeClass("active");
    }
}

function closeAllLists(el) {
    $('.clear').show();
    $(el).parent().remove();
}

$('body').on('click', function(e) {
    if($('.items').length > 0) {
        $('.items').remove();

        $('#name').val('');
        $('#email').val('');

        $('#name').prop('readonly', false);
    };
});

$('.clear').click(function() {
    $(this).hide();

    $('#name').prop('readonly', false);

    $('#name').val('');
    $('#email').val('');
});