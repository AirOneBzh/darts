
    var $uploadCrop;

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                $uploadCrop.bind({
                    url: e.target.result
                }).then(function () {
                    console.log('jQuery bind complete');
                });

            }

            reader.readAsDataURL(input.files[0]);
        } else {
            console.log("Sorry - you're browser doesn't support the FileReader API");
        }
    }

    $uploadCrop = new Croppie(document.getElementById('my-image'), {
        url: "/avatar/0",
        viewport: {width: 200, height: 200},
        boundary: {width: 250, height: 250},
        mouseWheelZoom: 'ctrl'
    });

    $('#my-image').on('change', function () {
        readFile(this);
        $uploadCrop.setZoom(0)
    });