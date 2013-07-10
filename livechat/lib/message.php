<?php

class Message {

    public $text, $postTime;

    function __construct($text, $postTime) {
        $this->text = $text;
        $this->postTime = $postTime;
    }

    public function __toString() {
        return $this->text;
    }

    public static function add($mtext, Conversation $conversation, User $user) {
        $db = db::getInstance();
        $db->addMessage($mtext, $conversation->id, $user->id);
    }

}

?>