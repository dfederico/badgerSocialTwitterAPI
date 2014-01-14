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

$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
$requestMethod = "GET";
$getfield = '?screen_name=iagdotme&count=20';
 
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
// $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
// $requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above **/
// $postfields = array(
//     'screen_name' => 'usernameToBlock', 
//     'skip_status' => '1'
// );

/** Perform a POST request and echo the response **/
// $twitter = new TwitterAPIExchange($settings);
// echo $twitter->buildOauth($url, $requestMethod)
//              ->setPostfields($postfields)
//              ->performRequest();

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
// $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
// $getfield = '?screen_name=fedafresh?count=5';
// $requestMethod = 'GET';
// $twitter = new TwitterAPIExchange($settings);
// echo $twitter->setGetfield($getfield)
//              ->buildOauth($url, $requestMethod)
//              ->performRequest();
?>