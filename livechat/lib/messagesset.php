<?php

class MessagesSet implements Iterator, Countable {

    private $position = 0, $messages = array();

    public function __construct() {
        $this->position = 0;
    }

    function rewind() {
        $this->position = 0;
    }

    function current() {
        return $this->messages[$this->position];
    }

    function key() {
        return $this->position;
    }

    function next() {
        ++$this->position;
    }

    function valid() {
        return isset($this->messages[$this->position]);
    }

    function add($message) {
        $this->messages[] = $message;
    }

    function count() {
        return count($this->messages);
    }

    public function after($datestamp) {
        if (!is_float($datestamp)) {
            $datestamp = 0;
        }

        $set = new MessagesSet();
        foreach ($this->messages as $message) {
            if ($datestamp < (float) $message->postTime) {
                $set->add($message);
            }
        }
        return $set;
    }

}

?>