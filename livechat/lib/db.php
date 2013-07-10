<?php

class db {

    public static $instance;
    private $mysqli;

    function __construct() {
        $this->mysqli = new mysqli("localhost", "frizzy", "password", "livechat");
        $this->mysqli->set_charset("utf8");
    }

    public function getNewClientId() {
        $put = $this->mysqli->query("INSERT INTO user(type) VALUES(1)");
        if ($put !== false) {
            return $this->mysqli->insert_id;
        } else {
            throw new Exception("Could not get new client id. Error: " . $this->mysqli->error);
        }
    }

    public function setClientLang($clientid, $language) {
        $put = $this->mysqli->query("UPDATE user SET lang = '" . $this->mysqli->real_escape_string($language) . "' WHERE id = '" . $clientid . "'");
        if ($put !== false) {
            return true;
        } else {
            throw new Exception("Could not update client language. Error: " . $this->mysqli->error);
        }
    }

    public function getConversationIdByClient($clientid) {
        $get = $this->mysqli->query("SELECT id, staffId FROM conversation WHERE clientId = '" . $clientid . "'");
        if ($get !== false) {
            $fetch = $get->fetch_array();
            return $fetch;
        } else {
            throw new Exception("Could not get conversation by clientid. Error: " . $this->mysqli->error);
        }
    }

    public function getClientLang($clientid) {
        $get = $this->mysqli->query("SELECT lang FROM user WHERE id = '" . $clientid . "'");
        if ($get !== false) {
            $fetch = $get->fetch_array();
            return $fetch['lang'];
        } else {
            throw new Exception("Could not update client language. Error: " . $this->mysqli->error);
        }
    }

    public function addConversation($client, $staff) {
        $clientid = $client->id;
        if ($staff instanceof Staff)
            $staffid = $staff->id;
        else
            $staffId = 0;

        $put = $this->mysqli->query("INSERT INTO conversation(clientId, staffId) 
			VALUES('" . $this->mysqli->real_escape_string($clientid) . "','" . $this->mysqli->real_escape_string($staffid) . "')");
        if ($put !== false) {
            return $this->mysqli->insert_id;
        } else {
            throw new Exception("Could not insert new conversation. Error: " . $this->mysqli->error);
        }
    }

    public function addMessage($message, $conversationId, $userid) {

        $put = $this->mysqli->query("INSERT INTO message(text, conversationId, postTime, posterId) 
											VALUES('" . $this->mysqli->real_escape_string($message) . "',
												   '" . $conversationId . "', '" . time() . "', '" . $userid . "')");
        if ($put !== false) {
            return true;
        } else {
            throw new Exception("Could not get new client id. Error: " . $this->mysqli->error);
        }
    }

    public function getMessagesByConversationId($conversationId) {
        $get = $this->mysqli->query("SELECT text, postTime FROM message WHERE conversationId = '" . $this->mysqli->real_escape_string($conversationId) . "' ORDER BY postTime ASC");
        if ($get !== false) {
            $fetch = array();
            while ($data = $get->fetch_assoc()) {
                $fetch[] = $data;
            }
            return $fetch;
        } else {
            throw new Exception("Could not get messages by conversationId. Error: " . $this->mysqli->error);
        }
    }

    public static function getInstance() {
        if (isset(self::$instance))
            return self::$instance;
        else {
            $db = new db();
            self::$instance = $db;
            return $db;
        }
    }

}

?>