<?php

$translations = array(
    "nl" => array(
        "welcome" => "Welkom bij onze livehulp. Stel uw vraag, en  wij proberen zo snel mogelijk bij u te zijn."
    ),
    "en-US" => array(
        "welcome" => "Welcome at our live support. Please aks your question, 
            and we'll try to be with you as soon as possible"
    )
);

function translate($text, $lang) {
    global $translations;
    return $translations[$lang][$text];
}

?>