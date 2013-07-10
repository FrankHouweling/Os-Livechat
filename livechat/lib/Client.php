<?php

/**
 * Client Class, OS Livechat
 * @author Frank Houweling <houweling.frank@gmail.com>
 * @version Beta 0.1
 */
class Client extends User {

    public $id, $lang, $activeConversation;
    private $db;
    static $clients = array();

    public function __construct($id) {
        $this->id = $id;
        $this->db = DB::getInstance();
        $this->lang = $this->db->getClientLang($this->id);
        $this->activeConversation = $this->getConversation();
        self::$clients[] = $this;
    }

    public function getConversation() {
        return Conversation::getByClient($this);
    }

    public function inConversation() {
        if ($this->activeConversation->staff !== false) {
            return true;
        } else {
            return false;
        }
    }

    public function getLastMessages($cnt = 10) {
        return false;
    }

    public function setLang($language) {
        $this->lang = $language;
        $this->db->setClientLang($this->id, $language);
    }

    public function sendMessage($message) {
        if (!empty($message)) {
            Message::add($message, $this->activeConversation, $this);
        }
    }

    // Statics..

    /**
     *
     * Get an existing session
     * @param array session
     * @return boolean|Client
     *
     */
    public static function getBySession() {
        if (isset($_SESSION['client_id']))
            $client = Client::getInstance($_SESSION['client_id']);
        else {
            $db = DB::getInstance();
            $id = $db->getNewClientId();
            $_SESSION['client_id'] = $id;
            $client = Client::getInstance($id);
        }
        return $client;
    }

    public static function getById($id) {
        $client = Client::getInstance($id);
        return $client;
    }

    public static function getInstance($id) {
        foreach (self::$clients as $client) {
            if ($client->id == $id)
                return $client;
        }

        // Else return a new one
        return new Client($id);
    }

}

?>