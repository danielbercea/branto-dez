<?php
header('Content-Type: application/json; charset=utf-8');

function respond($ok, $err = null) {
  echo json_encode(["success" => $ok, "error" => $err]);
  exit;
}

$raw = file_get_contents("php://input");
if (!$raw) respond(false, "No body received.");

$data = json_decode($raw, true);
if (!is_array($data)) respond(false, "Invalid JSON.");

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$message = trim($data["message"] ?? "");

if ($name === "" || $email === "" || $message === "") respond(false, "Completează toate câmpurile.");
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(false, "Email invalid.");

$to = "brantodez@gmail.com"; // recomand: contact@branto-dez.ro
$subject = "Mesaj nou de pe branto-dez.ro";

$body =
  "Nume: {$name}\n" .
  "Email: {$email}\n" .
  "Data: " . date("Y-m-d H:i:s") . "\n\n" .
  "Mesaj:\n{$message}\n";

$from = "no-reply@branto-dez.ro"; // IMPORTANT: pe domeniul tău
$headers =
  "From: Branto-Dez <{$from}>\r\n" .
  "Reply-To: {$email}\r\n" .
  "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

if ($sent) respond(true);
respond(false, "mail() a eșuat. Verifică setările serverului/email.");