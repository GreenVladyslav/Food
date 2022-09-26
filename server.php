<?php
$_POST = json_decode(file_get_contents("php://input"), true); /* декодируем чтобы получить json */
echo var_dump($_POST);

/*данные которые пришли превращает данные в строку и показывает обратно на клиен */