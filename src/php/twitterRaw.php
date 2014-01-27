<?php
ini_set('display_errors', true);
require_once('TwitterAPIExchange.php');

if (!in_array('curl', get_loaded_extensions())) 
        {
            throw new Exception('You need to install cURL, see: http://curl.haxx.se/docs/install.html');
        }

$held = "hello";
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "1905288655-gxnskDFvid842Ug1ltM5f87vfmRteeIk13Jv2Gz",
    'oauth_access_token_secret' => "SDIdBrPSjA0wefPce0jdJfAhdhgHCNpAAgE1xPpm8I5OB",
    'consumer_key' => "Skh7VQHsYZBWrvbFJuiNw",
    'consumer_secret' => "qfTC8DnzphhJGjB7hUMVqgESN3wDyavmSy8dG22hUUs"
);

$handle = $_GET["handle"];

$encodeURL = "https://api.twitter.com/1/statuses/oembed.json";
$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
$requestMethod = "GET";
$getfield = '?screen_name=' . $handle . '&count=5';
 
$twitter = new TwitterAPIExchange($settings);
$twitterData = $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();

echo $twitterData;


?>