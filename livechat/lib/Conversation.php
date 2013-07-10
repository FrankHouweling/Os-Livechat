<?php

/**
 * Conversation Class, OS Livechat
 * @author Frank Houweling <houweling.frank@gmail.com
 * @version Beta 0.1
 */
class Conversation {

    public $staff, $client, $id, $db;
    static $conversations;

    function __construct($conversationId, $client = false, $staff = false) {
        $this->id = $conversationId;
        $this->client = $client;
        $this->staff = $staff;
        $this->db = DB::getInstance();
    }

    public function getMessages() {
        $resultSet = new MessagesSet();
        $dbResult = $this->db->getMessagesByConversationId($this->id);
        foreach ($dbResult as $result) {
            $resultSet->add(new Message($result['text'], $result['postTime']));
        }
        return $resultSet;
    }

    // Statics

    /**
     *
     * Get a conversation instance for a given client
     * @param Client $client The given client
     * @return boolean|Conversation
     *
     */
    public static function getByClient($client) {
        $db = DB::getInstance();
        $conversation = $db->getConversationIdByClient($client->id);

        if ($conversation == false) {
            return Conversation::addNewByClient($client);
        }

        if ($conversation['staffId'] !== "0") {
            $staff = Staff::getById($conversation['staffId']);
        } else {
            $staff = false;
        }

        return new Conversation($conversation['id'], $client, $staff);
    }

    public static function addNewByClient($client) {
        $db = DB::getInstance();
        $id = $db->addConversation($client, false);
        return new Conversation($id, $client, false);
    }

    /**
     *
     * Get a conversation instance for a given staff
     * @param Staff $staff The given staff
     * @return boolean|Conversation
     *
     */
    public static function getByStaff($staff) {
        return new Conversation("1", false, $staff);
    }

}

?>